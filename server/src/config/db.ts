import mariadb, { PoolConnection } from "mariadb";

export async function initializeDB() {
  console.log("Initializing database...");

  const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "test",
    port: 3306,
    connectionLimit: 5,
  });

  let conn: PoolConnection | null = null;
  try {
    conn = await pool.getConnection();
    await conn.query(`CREATE DATABASE IF NOT EXISTS testidms;`);
    await conn.query(`USE testidms;`);

    // Creating `products` Table inside Database
    await conn.query(`
    CREATE TABLE IF NOT EXISTS products (
      productId INT AUTO_INCREMENT PRIMARY KEY,
      productName VARCHAR(255),
      category VARCHAR(255),
      measuringUnit VARCHAR(255),
      packSize INT,
      noOfUnits INT,
      unitMRP DECIMAL(10,2),
      packMRP DECIMAL(10,2),
      manufacturer VARCHAR(255),
      marketer VARCHAR(255),
      supplier VARCHAR(255),
      upc VARCHAR(255),
      hsn VARCHAR(255),
      cgst DECIMAL(10,2),
      sgst DECIMAL(10,2),
      igst DECIMAL(10,2),
      cess DECIMAL(10,2),
      loadPrice DECIMAL(10,2),
      unloadingPrice DECIMAL(10,2),
      dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      addedBy VARCHAR(255),
      lastEditedDate TIMESTAMP,
      lastEditedBy VARCHAR(255)
    );
`);

    // Creating `vendors` Table inside Database
    await conn.query(`
  CREATE TABLE IF NOT EXISTS vendors (
    vendorId INT AUTO_INCREMENT PRIMARY KEY,
    vendorName VARCHAR(255),
    businessName VARCHAR(255),
    email VARCHAR(255),
    mobileNumber VARCHAR(10),
    alternateMobileNumber VARCHAR(10),
    addressLine1 VARCHAR(255),
    addressLine2 VARCHAR(255),
    landmark VARCHAR(255),
    city VARCHAR(255),
    district VARCHAR(255),
    state VARCHAR(255),
    pinCode VARCHAR(6),
    gstin VARCHAR(255),
    fssai VARCHAR(255),
    registrationNumber VARCHAR(255),
    aadharNumber VARCHAR(255),
    panNumber VARCHAR(255),
    otherDocuments VARCHAR(255),
    status VARCHAR(255),
    dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    addedBy VARCHAR(255),
    lastEditedDate TIMESTAMP,
    lastEditedBy VARCHAR(255)
  );
`);

    // Creating `offers` Table inside Database
    await conn.query(`
  CREATE TABLE IF NOT EXISTS offers (
    offerId INT AUTO_INCREMENT PRIMARY KEY,
    offerType VARCHAR(255),
    offerName VARCHAR(255),
    startDate DATE,
    endDate DATE,
    products VARCHAR(255),
    offers VARCHAR(255),
    discountValue DECIMAL(10,2),
    discountPercentage DECIMAL(10,2),
    maximumDiscountValue DECIMAL(10,2),
    minimumPurchase DECIMAL(10,2),
    offerApplicabilityFrequency VARCHAR(255),
    applicableTo VARCHAR(255),
    status VARCHAR(255),
    dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    addedBy VARCHAR(255),
    lastEditedDate TIMESTAMP,
    lastEditedBy VARCHAR(255)
  );
`);

    // Creating `transports` Table inside Database
    await conn.query(`
    CREATE TABLE IF NOT EXISTS transports (
      transportId INT AUTO_INCREMENT PRIMARY KEY,
      transportName VARCHAR(255),
      businessName VARCHAR(255),
      vehicleName VARCHAR(255),
      email VARCHAR(255),
      mobileNumber VARCHAR(255),
      alternateMobileNumber VARCHAR(255),
      addressLine1 VARCHAR(255),
      addressLine2 VARCHAR(255),
      landmark VARCHAR(255),
      city VARCHAR(255),
      district VARCHAR(255),
      state VARCHAR(255),
      pinCode VARCHAR(255),
      branchOffice VARCHAR(255),
      aadharNumber VARCHAR(255),
      panNumber VARCHAR(255),
      driverName VARCHAR(255),
      driverMobileNumber VARCHAR(255),
      driverAlternateNumber VARCHAR(255),
      status VARCHAR(255),
      dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      addedBy VARCHAR(255),
      lastEditedDate TIMESTAMP,
      lastEditedBy VARCHAR(255)
    );
`);

    // Creating `inventory` Table inside Database
await conn.query(` 
  CREATE TABLE IF NOT EXISTS inventory(
    inventoryId INT AUTO_INCREMENT PRIMARY KEY,
    orderedDate VARCHAR(10),
    dateOfEntry VARCHAR(10),
    referenceNumber VARCHAR(255),
    supplier VARCHAR(255),
    reason VARCHAR(255),
    productId INT,
    dateOfManufacture VARCHAR(10),
    dateOfExpiry VARCHAR(10),
    quantity INT,
    purchasePrice DECIMAL(10, 2),
    sellingPrice DECIMAL(10, 2),
    batchNumber VARCHAR(255),
    storageLocation VARCHAR(255),
    additionalNote VARCHAR(255),
    dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    addedBy VARCHAR(255),
    lastEditedDate TIMESTAMP,
    lastEditedBy VARCHAR(255),
    FOREIGN KEY (productId) REFERENCES products(productId)
  );
  `);



// Creating `suppliers` Table inside Database
await conn.query(`
  CREATE TABLE IF NOT EXISTS suppliers (
    supplierId INT AUTO_INCREMENT PRIMARY KEY,
    supplierName VARCHAR(255),
    businessName VARCHAR(255),
    mobileNumber VARCHAR(10),
    alternateMobileNumber VARCHAR(10),
    email VARCHAR(255),
    addressLine1 VARCHAR(255),
    addressLine2 VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    pinCode VARCHAR(6),
    beneficiaryName VARCHAR(255),
    accountNumber VARCHAR(255),
    ifscCode VARCHAR(11),
    virtualPaymentAddress VARCHAR(255),
    remarks VARCHAR(255),
    dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    addedBy VARCHAR(255),
    lastEditedDate TIMESTAMP,
    lastEditedBy VARCHAR(255)
  );
  `);
  
  await conn.query(`
    CREATE TABLE IF NOT EXISTS user_activity (
      productsAdded BOOLEAN NOT NULL DEFAULT false
    );
    `);

  await conn.query(`
      INSERT INTO user_activity (
        productsAdded
      ) VALUES (
        false
      )
    `)

    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Error initializing database: ", err);
  } finally {
    if (conn) conn.release();
  }
}

export const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "test",
  port: 3306,
  database: "testidms",
  connectionLimit: 5,
});
