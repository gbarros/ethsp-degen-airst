# Copyright 2023 Cartesi Pte. Ltd.
#
# SPDX-License-Identifier: Apache-2.0
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use
# this file except in compliance with the License. You may obtain a copy of the
# License at http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed
# under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
# CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.

from os import environ
import json
import logging
import requests

from .cartesi import send_notice, send_report
from .ipfs import get_media_descriptor
from .model import Model, image_to_bytes

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ.get("ROLLUP_HTTP_SERVER_URL", '')

MODEL = Model()


def hex2str(hex):
    """
    Decodes a hex string into a regular string
    """
    return bytes.fromhex(hex[2:]).decode("utf-8")


def str2hex(str):
    """
    Encodes a string as a hex string
    """
    return "0x" + str.encode("utf-8").hex()


def _create_notice_payload(data: bytes):
    descr = get_media_descriptor(data)
    descr = json.dumps(descr)
    return str2hex(descr)

def _decode_payload(payload: str):
    data = json.loads(hex2str(payload))
    return (
        data.get('class', 0),
        data.get('random_str', ''),
    )


def _get_filename(klass):
    name = MODEL.labels[klass]
    name = (
        name.lower().replace(' ', '_')
    )
    return name + '.jpg'


def handle_advance(data):
    logger.info(f"Received advance request data {data}")

    klass, random_str = _decode_payload(data['payload'])
    logger.info("Generating image for class %s, seed '%s'", klass, random_str)

    img = MODEL.gen_image(klass=klass, random_str=random_str)
    img_data = image_to_bytes(img)
    filename = _get_filename(klass)

    notice = {"payload": _create_notice_payload(img_data, filename=filename)}
    report = {'payload': '0x' + img_data.hex()}

    send_notice(notice)
    send_report(report)
    return "accept"


def handle_inspect(data):
    logger.info(f"Received inspect request data {data}")

    decoded_data = hex2str(data['payload'])
    logger.info("Echoing '%s'", decoded_data)
    report = {"payload": str2hex(decoded_data)}

    send_report(report)
    return "accept"


handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}


def main_loop():
    MODEL.load()
    finish = {"status": "accept"}
    rollup_address = None

    while True:
        logger.info("Sending finish")
        response = requests.post(rollup_server + "/finish", json=finish)
        logger.info(f"Received finish status {response.status_code}")
        if response.status_code == 202:
            logger.info("No pending rollup request, trying again")
        else:
            rollup_request = response.json()
            data = rollup_request["data"]
            if "metadata" in data:
                metadata = data["metadata"]
                if metadata["epoch_index"] == 0 and metadata["input_index"] == 0:
                    rollup_address = metadata["msg_sender"]
                    logger.info(f"Captured rollup address: {rollup_address}")
                    continue
            handler = handlers[rollup_request["request_type"]]
            finish["status"] = handler(rollup_request["data"])


if __name__ == '__main__':
    main_loop()
