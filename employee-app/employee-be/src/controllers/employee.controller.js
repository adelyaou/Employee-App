const Employee = require('../models/employee.model');

exports.list = async (req, res) => {
  const employees = await Employee.findAll({ order: [['id', 'DESC']] });
  res.json(employees);
};

exports.get = async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ msg: 'Employee not found' });
  res.json(emp);
};

exports.create = async (req, res) => {
  const data = req.body;
  try {
    const created = await Employee.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ msg: 'Employee not found' });
  await emp.update(req.body);
  res.json(emp);
};

exports.delete = async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ msg: 'Employee not found' });
  await emp.destroy();
  res.json({ msg: 'Deleted' });
};
