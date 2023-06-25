import unittest
import pathlib

from dapp import ipfs

class TestIPFS(unittest.TestCase):

    def test_get_ipfs_cid(self):
        path = pathlib.Path(__file__).with_name('sample_image.jpg')
        data = path.read_bytes()

        cid = ipfs.get_ipfs_cid(data)
        self.assertEqual(cid, "QmQygJ7BhLeEhRe8kstLHwkQdKzJAkJYGSju6XZiFAe15Y")
