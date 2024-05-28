import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
	Button,
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Container } from '@mui/material';

import serverInstance from "../../services/serverInstance";
import { MuiTable } from "../../components/MuiTable";

const tableFields = [
  "offerId",
  "offerName",
  "offerType",
  "startDate",
  "endDate",
  "products",
  "discountValue",
  "discountPercentage",
  "maximumDiscountValue",
  "minimumPurchase",
  "offerApplicabilityFrequency",
  "applicableTo",
  "status",
  "dateAdded",
  "addedBy",
  "lastEditedDate",
  "lastEditedBy",

];

const ViewOffer = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serverInstance.get("/offers");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((offer) =>
    offer.offerName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (

    <Container sx={{ p: 2 }}>

      <div className="flex p-4 justify-evenly items-center w-full border">
        <h1 className="text-4xl font-bold mb-4 text-center">View Offer</h1>
        <input
          className="px-4 py-2 border max-w-max rounded-lg"
          placeholder="Search Offer..."
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
          <NavLink
            to="/offers/add"
          >
        <Button size="large" variant="contained" color="success">
            <AddCircleIcon />
        </Button>
          </NavLink>
      </div>

      <MuiTable tableFields={tableFields} tableData={filteredData} />
      

    </Container>
  );
};

export default ViewOffer;