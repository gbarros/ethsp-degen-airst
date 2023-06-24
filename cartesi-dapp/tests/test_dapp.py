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

        data = {"payload": "0x4F6CC3A1204D756E646F21"}
        result = handle_advance(data)
        mock_notice.assert_called()
        mock_report.assert_called()
        self.assertEqual(result, 'accept')
