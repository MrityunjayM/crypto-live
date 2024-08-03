"use client";
import CRYPTOS from "@/cryptos";
import { selectCrypto } from "@/redux/features/cryptoSlice";
import { useAppDispatch } from "@/redux/store";

const CryptoSelectModal = ({ selected }: { selected: string }) => {
  const dispatch = useAppDispatch();
  const tabs = CRYPTOS.map((c) => (
    <button
      key={c}
      className="btn btn-sm btn-primary"
      data-bs-dismiss="modal"
      onClick={(e) => dispatch(selectCrypto(c))}
    >
      {c}
    </button>
  ));
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#selectModal"
      >
        {selected}
      </button>
      <div
        className="modal fade"
        id="selectModal"
        tabIndex={-1}
        area-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Select Crypto to See Live Price</h4>
            </div>
            <div className="modal-body d-flex justify-content-between">
              {tabs}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoSelectModal;
