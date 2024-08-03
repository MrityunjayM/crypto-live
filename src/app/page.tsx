"use client";
import { useSelector, shallowEqual } from "react-redux";
import { fetchCryptos, InitState } from "@/redux/features/cryptoSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import CryptoSelectModal from "@/components/CryptoSelectModal";
import Placeholder from "@/components/Placeholder";

export default function Home() {
  const dispatch = useAppDispatch();
  const { selected, cryptos, loading } = useSelector<RootState>(
    (state) => state.crypto,
    shallowEqual
  ) as InitState;

  useEffect(() => {
    let intervalId = setInterval(() => dispatch(fetchCryptos(selected)), 3000);

    return () => clearInterval(intervalId);
  }, [selected]);

  const tableRows = cryptos.map((c, i) => (
    <tr key={c._id}>
      <th scope="row">{i + 1}</th>
      <td>
        <img src={c.img_small} alt={c.name} width={20} />
      </td>
      <td>
        {c.name} ({c.symbol})
      </td>
      <td>${c.price.toFixed(2)}</td>
      <td>{new Date(c.createdAt).toLocaleString("en-IN")}</td>
    </tr>
  ));

  if (loading && cryptos.length < 1) {
    return <Placeholder />;
  }

  return (
    <>
      <div className="alert alert-light" role="alert">
        Price updates every 3 seconds. Click on button to change coin.
      </div>
      <CryptoSelectModal selected={selected} />
      {!loading && cryptos.length > 0 ? (
        <table className="table mt-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">DateTime</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center border border-1 mt-3"
          style={{ minHeight: "175px", borderColor: "rgb(204 210 216)" }}
        >
          <p className="text-muted fs-4">No Data</p>
        </div>
      )}
    </>
  );
}
