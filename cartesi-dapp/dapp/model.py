import json
import pathlib
from io import BytesIO

import numpy as np
from PIL import Image

from tflite_runtime.interpreter import Interpreter

class Model:

    model_file = 'data/biggan128.tflite'
    embeddings_file = 'data/biggan128_embeddings.npy'
    labels_file = 'data/simple_labels.json'

    def __init__(self):
        self.interp: Interpreter | None = None
        self.labels: list[str] | None = None
        self.embeddings = None

        self._input_trunc_idx: int = 0
        self._input_y_idx: int = 0
        self._input_z_idx: int = 0
        self._output_idx: int = 0

    def _get_full_paths(self):
        project_root = pathlib.Path(__file__).parent.parent
        model_path = (project_root / self.model_file).resolve()
        emb_path = (project_root / self.embeddings_file).resolve()
        labels_path = (project_root / self.labels_file).resolve()
        return model_path, emb_path, labels_path

    def load(self) -> None:
        if self.interp is not None:
            return

        model_path, emb_path, labels_path = self._get_full_paths()

        self.interp = Interpreter(str(model_path))
        self.interp.allocate_tensors()

        self.embeddings = np.load(emb_path)

        with labels_path.open() as fin:
            self.labels = json.load(fin)

        in_details = self.interp.get_input_details()
        in_details = {x['name']: x for x in in_details}

        self._input_trunc_idx = in_details['serving_default_truncation:0']['index']
        self._input_y_idx = in_details['serving_default_y:0']['index']
        self._input_z_idx = in_details['serving_default_z:0']['index']

        output_details = self.interp.get_output_details()
        self._output_idx = output_details[0]['index']

    def _get_embedding(self, klass: int):
        return self.embeddings[klass, :].reshape((1, -1))

    def _get_noise(self, random_str: str):
        noise = np.array([[ 0.3613321 , -0.4329873 ,  0.31001532, -0.47121036,  0.28101492,
                0.38838977, -0.1870463 ,  0.2789328 ,  0.05339714, -0.59341365,
                -0.12672678,  0.15515995,  0.35383034, -0.31777644, -0.05349786,
                -0.3957184 , -0.34555075, -0.8005098 ,  0.4448731 ,  0.3787975 ,
                -0.67197645,  0.52583534,  0.6952209 , -0.80583316, -0.5744537 ,
                -0.26216146, -0.0902325 , -0.10479109,  0.16853657, -0.35988998,
                -0.63987684, -0.3248439 , -0.9393    , -0.63973355, -0.09357104,
                -0.24470416, -0.51690716,  0.25655824, -0.28972393,  0.8301845 ,
                -0.06396087, -0.261994  , -0.35756552,  0.878979  , -0.15537784,
                -0.18849547, -0.801109  ,  0.08172615,  0.21926022,  0.09724676,
                0.2921605 ,  0.40831774,  0.63645864,  0.58495545,  0.49558225,
                0.38575575, -0.5135736 ,  0.40960988,  0.06417953,  0.2049222 ,
                -0.29179296, -0.09656712,  0.07754408, -0.24543966,  0.185178  ,
                0.10947159, -0.4964104 ,  0.20512794, -0.31075886, -0.01154578,
                -0.5273004 ,  0.1197101 ,  0.35182428,  0.28649345,  0.76772815,
                -0.5598206 , -0.33805487, -0.99259996, -0.24337754,  0.40209258,
                0.23637657, -0.26115212, -0.4951332 , -0.51337135,  0.22088158,
                0.07728053,  0.8131723 , -0.21740186, -0.4371897 ,  0.51091784,
                0.17790478, -0.1380034 , -0.00827751,  0.1535147 , -0.4505945 ,
                0.24342993,  0.00721046, -0.01600833,  0.31283143, -0.7650807 ,
                0.6725009 ,  0.2754262 ,  0.13920209, -0.11972065,  0.03819929,
                -0.23340899, -0.31271964,  0.7720286 ,  0.79176855, -0.03955154,
                0.25376937, -0.46046895,  0.04788103,  0.05518989, -0.51645565,
                0.73482794,  0.21705878,  0.7415713 ,  0.2971464 , -0.070179  ,
                0.6120158 ,  0.76977736, -0.17497267,  0.14639917, -0.02779335,
                0.04843735,  0.04810163, -0.6032188 ]], 'float32')
        return noise

    def gen_image(self, klass: int, random_str: str, truncation: float = 0.5):
        self.load()

        # Input truncation
        self.interp.set_tensor(self._input_trunc_idx, np.float32(truncation))

        # Generate Embedding
        embeddings = self._get_embedding(klass)
        self.interp.set_tensor(self._input_y_idx, embeddings)

        # Generate Noise
        noise = self._get_noise(random_str)
        self.interp.set_tensor(self._input_z_idx, noise)

        # Invoke Inference
        self.interp.invoke()
        output = self.interp.get_tensor(self._output_idx)

        # Network outputs are between -1 and 1. We need an uint8.
        output_img = (
            (output[0, :, :, :] + 1.0) * 127.5
        ).astype('uint8')

        img = Image.fromarray(output_img)
        return img


def image_to_bytes(img) -> bytes:
    buffer = BytesIO()
    img.save(buffer, "JPEG")
    return buffer.getvalue()
