"""
Acceptance Tests for the whole dapp
"""
import unittest
from unittest.mock import patch

import dapp.dapp


class TestDapp(unittest.TestCase):

    @patch('dapp.dapp.send_report')
    @patch('dapp.dapp.send_notice')
    def test_advance(self, mock_notice, mock_report):

        data = {
            "payload": (
                "0x7b22636c617373223a2033302c202272616e646f6d5f737472223a202269"
                "6d6167656d207465737465227d"
            )
        }
        result = dapp.dapp.handle_advance(data)
        mock_notice.assert_called()
        mock_report.assert_called()
        self.assertEqual(result, 'accept')

    def test_filename(self):

        dapp.dapp.MODEL.load()
        fname = dapp.dapp._get_filename(5)
        self.assertEqual(fname, 'electric_ray.jpg')
