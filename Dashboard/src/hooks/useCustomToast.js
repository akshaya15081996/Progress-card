import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useCustomToasts = (navigate) => { 

    const SuccessToast = (msg, navurl ) => {
      toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        onClose: () => {
          if (navurl) {
            navigate(navurl);
          }
        },
      });
    };

  const SuccessToastWithoutNav = (msg, navurl = null) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 1000,
      closeOnClick: true,
    });
  };
  const ErrorToast = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 1000,
      closeOnClick: true,
    });
  };
  const confirmDeleteToast = (confirmDelete, id, type) => {
    toast.warn(
      <div>
        <div>Are you sure you want to delete this {type}?</div>
        <div className="d-flex justify-content-end mt-2">
          <button
            className="btn btn-danger me-2"
            onClick={() => {
              confirmDelete(id);
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <button className="btn btn-secondary" onClick={() => toast.dismiss()}>
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return {
    SuccessToast,
    ErrorToast,
    confirmDeleteToast,
    SuccessToastWithoutNav,
  };
};

export default useCustomToasts;


