import {
    Box,
    TextField,
    Button,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import serverInstance from "../services/serverInstance";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";

const MuiFormAdd = ({ title, products = [], categories, fields, goodsCategories = [] }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(
        fields.reduce((obj, item) => ({ ...obj, [item.name]: "" }), {}),
    );
    const [goodsSections, setGoodsSections] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState([]);
    const [selectedReason, setSelectedReason] = useState([]);
    const navigate = useNavigate();

    const reasons = ["Reason 1", "Reason 2", "Reason 3", "Reason 4", "Reason 5"]; // Dummy values for Reason/Purpose

    const check = title;
    let alertPrompt = "";
    if (check === "transport") {
        alertPrompt = "Transport added successfully!";
    } else if (check === "inventory") {
        alertPrompt = "Goods Entry done successfully!";
    } else {
        alertPrompt =
            title.slice(0, 1).toUpperCase() +
            title.slice(1, title.length - 1) +
            " added successfully!";
    }


    const handleChange = (e, sectionId = 0) => {
        const { name, value } = e.target;
        const key = sectionId === 0 ? name : `${name}_${sectionId}`;
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalData = { ...formData, addedBy: "admin" };
        const url = `/${title}/add`;

        try {
            console.log(finalData);
            await serverInstance.post(url, finalData);
            setOpen(true);
        } catch (error) {
            console.error("Error:", error);
            setOpen(true);
        }
    };

    const addAnotherGoodsSection = () => {
        setGoodsSections([...goodsSections, goodsSections.length]);
    };

    const removeGoodsSection = (index) => {
        const newGoodsSections = goodsSections.filter((_, i) => i !== index);
        setGoodsSections(newGoodsSections);

        const newFormData = { ...formData };
        fields
            .filter((field) => field.category === "Add Goods")
            .forEach((field) => {
                delete newFormData[`${field.name}_${index}`];
            });
        setFormData(newFormData);
    };

    const renderFields = (category, sectionId = 0, useGridLayout = false) => (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: useGridLayout
                    ? "repeat(3, 1fr)"
                    : "repeat(1, 1fr)",
                gap: 2,
            }}
        >
            {fields
                .filter((field) => field.category === category)
                .map((field, fieldIndex) => {
                    const id =
                        sectionId === 0 ? field.name : `${field.name}_${sectionId}`;
                    let value = formData[id];

                    if (title === "inventory" && field.name === "productName") {
                        return (
                            <Autocomplete
                                key={`${category}-${sectionId}-${fieldIndex}`}
                                options={products}
                                getOptionLabel={(option) => option.productName}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Product Name"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                )}
                                value={selectedProduct[sectionId]}
                                onChange={(_, newValue) => {
                                    let newSelectedProduct = [...selectedProduct];
                                    newSelectedProduct[sectionId] = newValue;
                                    setSelectedProduct(newSelectedProduct);
                                    handleChange({ target: { name: field.name, value: newValue?.productName } }, sectionId);
                                }}
                            />
                        );
                    } else if (title === "inventory" && field.name === "supplier") {
                        return (
                            <Autocomplete
                                key={`${category}-${sectionId}-${fieldIndex}`}
                                options={products}
                                getOptionLabel={(option) => option.supplier}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Supplier"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                )}
                                value={selectedSupplier[sectionId]}
                                onChange={(_, newValue) => {
                                    let newSelectedSupplier = [...selectedSupplier];
                                    newSelectedSupplier[sectionId] = newValue;
                                    setSelectedSupplier(newSelectedSupplier);
                                    handleChange({ target: { name: field.name, value: newValue?.supplier } }, sectionId);
                                }}
                            />
                        );
                    } else if (title === "inventory" && field.name === "reason") {
                        return (
                            <Autocomplete
                                key={`${category}-${sectionId}-${fieldIndex}`}
                                options={reasons}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Reason/Purpose"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                )}
                                value={selectedReason[sectionId]}
                                onChange={(_, newValue) => {
                                    let newSelectedReason = [...selectedReason];
                                    newSelectedReason[sectionId] = newValue;
                                    setSelectedReason(newSelectedReason);
                                    handleChange({ target: { name: field.name, value: newValue } }, sectionId);
                                }}
                            />
                        );
                    } else {
                        return (
                            <TextField
                                key={`${category}-${sectionId}-${fieldIndex}`}
                                id={id}
                                name={field.name}
                                label={field.label}
                                type={field.type}
                                value={value}
                                onChange={(e) => handleChange(e, sectionId)}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                                inputProps={field.type === "number" ? { min: 0 } : {}}
                                required
                            />
                        );
                    }
                })}
        </Box>
    );


    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={() => {
                    setOpen(false);
                    navigate(`/${title}`);
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => {
                        setOpen(false);
                        navigate(`/${title}`);
                    }}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {alertPrompt}
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit} className="w-3/4 flex flex-col gap-4">
                {categories.map((category, index) => (
                    <div
                        className="p-8 border rounded-2xl bg-white bg-opacity-90"
                        key={index}
                    >
                        <h1 className="text-xl mb-4 font-bold">{category}</h1>
                        {renderFields(category, 0, goodsCategories.includes(category))}
                    </div>
                ))}

                {/* Additional Goods Sections */}
                {goodsSections.map((_, index) => (
                    <div
                        className="p-8 border rounded-2xl bg-white bg-opacity-90 mt-4"
                        key={`add-goods-${index}`}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <h1 className="text-xl mb-4 font-bold">Add Goods {index + 1}</h1>
                            <IconButton
                                onClick={() => removeGoodsSection(index)}
                                color="secondary"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        {renderFields("Add Goods", index, true)}
                    </div>
                ))}

                {/* Button to Add More Goods Sections */}
                
                {title === "inventory" && (
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            onClick={addAnotherGoodsSection}
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleOutlineIcon />}
                        >
                            Add More Goods
                        </Button>
                    </Box>
                )}

                
                <Box className="flex justify-center mt-5">
                    <Button
                        className="flex justify-center mt-5"
                        type="submit"
                        variant="contained"
                        sx={{
                            width: "60%",
                            backgroundColor: "green",
                            p: 2,
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "darkgreen",
                            },
                        }}
                    >
                        Add to stock
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default MuiFormAdd;