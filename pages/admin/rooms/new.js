import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { newRoom } from "../../../redux/actions/rooms";
import ButtonLoader from "../../../components/ButtonLoader";
import { getSession } from "next-auth/client";
import { RESET_CREATE_ROOM } from "../../../redux/types/type";

export default function CreateNewRoom() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, success } = useSelector((state) => state.newRoom);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      router.push("/admin/rooms");
      dispatch({ type: RESET_CREATE_ROOM });
    }
  }, [error, success]);

  const [values, setValues] = useState({
    name: "",
    pricePerNight: 0,
    description: "",
    address: "",
    category: "King",
    guestCapacity: 1,
    numOfBeds: 1,
    internet: false,
    breakfast: false,
    airConditioned: false,
    petsAllowed: false,
    roomCleaning: false,
  });

  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const roomData = {
      ...values,
      images,
    };

    if (images.length === 0) {
      return toast.error("Please upload images");
    }

    dispatch(newRoom(roomData));
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={onSubmitHandler}
          >
            <h1 className="mb-4">New Room</h1>
            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                name="name"
                className="form-control"
                value={values.name}
                required
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price_field">Price</label>
              <input
                type="number"
                min="0"
                step=".01"
                id="price_field"
                name="pricePerNight"
                className="form-control"
                checked={values.pricePerNight}
                placeholder="$10"
                required
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_field">Description</label>
              <textarea
                className="form-control"
                id="description_field"
                name="description"
                rows="8"
                value={values.description}
                required
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={values.address}
                required
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category_field">Category</label>
              <select
                className="form-control"
                id="category_field"
                name="category"
                value={values.category}
                onChange={(e) => onChange(e)}
              >
                <option value="King">King</option>
                <option value="Single">Single</option>
                <option value="Twins">Twins</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category_field">Guest Capacity</label>
              <select
                className="form-control"
                id="guestCapacity_field"
                name="guestCapacity"
                value={values.guestCapacity}
                onChange={(e) =>
                  setValues({
                    ...values,
                    guestCapacity: Number(e.target.value),
                  })
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category_field">Number of Beds</label>
              <select
                className="form-control"
                id="numOfBeds_field"
                value={values.numOfBeds}
                onChange={(e) =>
                  setValues({ ...values, numOfBeds: Number(e.target.value) })
                }
                name="numOfBeds"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <label className="mb-3">Room Features</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="internet"
                name="internet"
                value={values.internet}
                checked={values.internet}
                onChange={(e) =>
                  setValues({ ...values, internet: !values.internet })
                }
              />
              <label className="form-check-label" htmlFor="internet">
                Internet
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="breakfast_checkbox"
                name="breakfast"
                value={values.breakfast}
                checked={values.breakfast}
                onChange={(e) =>
                  setValues({ ...values, breakfast: !values.breakfast })
                }
              />
              <label className="form-check-label" htmlFor="breakfast_checkbox">
                Breakfast
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="airConditioned_checkbox"
                name="airConditioned"
                value={values.airConditioned}
                checked={values.airConditioned}
                onChange={(e) =>
                  setValues({
                    ...values,
                    airConditioned: !values.airConditioned,
                  })
                }
              />
              <label
                className="form-check-label"
                htmlFor="airConditioned_checkbox"
              >
                Air Conditioned
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="petsAllowed_checkbox"
                value={values.petsAllowed}
                name="petsAllowed"
                checked={values.petsAllowed}
                onChange={(e) =>
                  setValues({ ...values, petsAllowed: !values.petsAllowed })
                }
              />
              <label
                className="form-check-label"
                htmlFor="petsAllowed_checkbox"
              >
                Pets Allowed
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="roomCleaning_checkbox"
                value={values.roomCleaning}
                name="roomCleanig"
                checked={values.roomCleaning}
                onChange={(e) =>
                  setValues({ ...values, roomCleaning: !values.roomCleaning })
                }
              />
              <label
                className="form-check-label"
                htmlFor="roomCleaning_checkbox"
              >
                Room Cleaning
              </label>
            </div>
            <div className="form-group mt-4">
              <label>Images</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="room_images"
                  className="custom-file-input"
                  id="customFile"
                  multiple
                  onChange={(e) => onChangeImage(e)}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>
              {imagesPreview.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="55"
                  height="52"
                />
              ))}
            </div>
            <button
              type="submit"
              className="btn btn-block new-room-btn py-3"
              disabled={loading ? true : false}
            >
              {loading ? <ButtonLoader /> : "CREATE"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session || session.user.avatar.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
