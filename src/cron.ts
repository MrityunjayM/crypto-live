import axios from "axios";
import "./mongoose";
import Crypto from "./models/crypto";
import CRYPTOS from "./cryptos";

const COIN_GEKO_URL = process.env.COIN_GEKO_URL as string;

axios.defaults.baseURL = COIN_GEKO_URL;

const metaInfo: any = { retry: 0 };

const fetchCrypto = async (meta: {
  retry: number;
  intervalId: NodeJS.Timeout | null;
}) => {
  try {
    if (meta.retry > 5 && meta.intervalId) clearInterval(metaInfo.intervalId);

    const { data } = await axios.get(
      `${COIN_GEKO_URL}/coins/markets?vs_currency=usd&ids=${CRYPTOS.toString()}`
    );

    const cryptos = data.map((d: any) => ({
      geko_id: d.id,
      name: d.name,
      symbol: d.symbol,
      price: d.current_price,
      img_small: d.image,
    }));

    for (const c of cryptos) {
      await Crypto.create(c);
    }
  } catch (err: any) {
    console.log(err.message);
    console.error(err);
    meta.retry++;
  }
};

metaInfo.intervalId = setInterval(() => fetchCrypto(metaInfo), 10 * 1000);
