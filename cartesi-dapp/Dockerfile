# syntax=docker.io/docker/dockerfile:1.4
FROM --platform=linux/riscv64 cartesi/python:3.10-slim-jammy

# These variables can be passed to add an extra Python index with
# prebuilt wheels for riscv64. See README.md for more information.
ARG PIP_EXTRA_INDEX_URL
ARG PIP_TRUSTED_HOST
ARG PIP_ONLY_BINARY

COPY requirements.txt /opt/cartesi/

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libopenblas0-serial libgomp1 libtiff5 libjpeg8 libopenjp2-7 zlib1g libfreetype6 liblcms2-2 libwebp7 libharfbuzz0b libfribidi0 libxcb1 libatomic1 \
    && rm -rf /var/apt/lists/* \
    && pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r /opt/cartesi/requirements.txt


WORKDIR /opt/cartesi/dapp
COPY . .
