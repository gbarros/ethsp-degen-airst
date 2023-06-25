import unittest

import dapp.model


class TestModel(unittest.TestCase):

    def test_model(self):

        model = dapp.model.Model()
        model.load()

        img = model.gen_image(100, 'test')

        self.assertEqual(model._input_y_idx, 1)
        self.assertEqual(model.embeddings.shape[0], 1000)
        self.assertIsInstance(img, dapp.model.Image.Image)
        self.assertEqual(img.height, 128)
        self.assertEqual(img.width, 128)
        self.assertEqual(img.mode, 'RGB')
