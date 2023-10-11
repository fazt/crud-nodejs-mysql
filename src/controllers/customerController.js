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
  //const user = req.body;
  //Instrucción sql para buscar un usuario en la base de datos e iniciar sesión
  /*
  const [rows] = await pool.query("SELECT * FROM customer WHERE address = ?", [
    user.address,
  ]);
  console.log(user);
  if (rows.length === 1) {
    if (rows[0].phone === user.phone) {
      return res.redirect("/");
    }
  }
  */

  res.render("singup");
};
