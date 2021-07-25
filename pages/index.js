import Homepage from "../components/Homepage";
import { getAllRooms } from "../redux/actions/rooms";
import { wrapper } from "../redux/store";
export default function Home() {
  return (
    <>
      <Homepage />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(getAllRooms(req, query.page, query.location));
    }
);
