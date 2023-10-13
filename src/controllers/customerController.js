import { pool } from "../db.js";

export const renderCustomers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM customer");
  res.render("customers", { customers: rows });
};

export const createCustomers = async (req, res) => {
  const newCustomer = req.body;
  await pool.query("INSERT INTO customer set ?", [newCustomer]);
  res.redirect("/");
};

export const editCustomer = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("SELECT * FROM customer WHERE id = ?", [
    id,
  ]);
  res.render("customers_edit", { customer: result[0] });
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await pool.query("UPDATE customer set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/");
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM customer WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Customer deleted" });
  }
  res.redirect("/");
};

export const singUp = async (req, res) => {
  res.render("singup", {});
};

export const home = async (req, res) => {
  res.send("Home");
};

//Función de autenticación
export const auth = async (req, res) => {
  const { email, password } = req.body;
  const [result] = await pool.query(
    "SELECT * FROM customer WHERE address = ? AND phone = ?",
    [email, password]
  );
  if (result.length > 0) {
    if (password === result[0].phone) {
      console.log("Error");
      res.redirect("/");
    } else {
      console.log("/home");
      res.redirect("/home");
    }
  } else {
    console.log("Correcto");
    res.redirect("/");
  }
};
