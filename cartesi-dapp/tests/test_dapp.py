"""
Acceptance Tests for the whole dapp
"""
import unittest
from unittest.mock import patch

import dapp.cartesi
from dapp.dapp import handle_advance


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
        result = handle_advance(data)
        mock_notice.assert_called()
        mock_report.assert_called()
        self.assertEqual(result, 'accept')
