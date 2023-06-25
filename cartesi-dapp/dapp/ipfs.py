import json
import hashlib

import base58

from .protobuf_models import unixfs_pb2, merkle_dag_pb2


def get_ipfs_cid(data: bytes) -> str:

    unixf = unixfs_pb2.Data()
    unixf.Type = 2 # file
    unixf.Data = data
    unixf.filesize = len(unixf.Data)

    mdag = merkle_dag_pb2.MerkleNode()
    mdag.Data = unixf.SerializeToString()

    mdata = mdag.SerializeToString()

    h = hashlib.sha256(mdata)
    sha256_code = "12"
    size = hex(h.digest_size)[2:]
    digest = h.hexdigest()
    combined = f"{sha256_code}{size}{digest}"
    multihash = base58.b58encode(bytes.fromhex(combined))
    cid = multihash.decode('utf-8')
    return cid


def get_media_descriptor(data: bytes, filename: str = 'media.jpg') -> dict:

    media_cid = get_ipfs_cid(data)

    json_data = {
        'name': filename,
        'description': 'AIDeGen NFT',
        'image': 'ipfs://' + media_cid,
        'attributes': [
            {
                'trait_type': 'generation',
                'value': 'generation',
            },
            {
                'trait_type':'type',
                'value':'UNKOWN'
            }
        ]
    }

    str_data = json.dumps(json_data)
    descriptor_cid = get_ipfs_cid(str_data.encode('utf-8'))

    return {
        'media_cid': media_cid,
        'descriptor_data': str_data,
        'descriptor_cid': descriptor_cid
    }
