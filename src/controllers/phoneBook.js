const PhoneBook = require("../models/phonebook");

exports.createData = (req, res) => {
  const phoneBook = new PhoneBook({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  });

  phoneBook
    .save()
    .then((result) => {
      return res.status(200).json({
        message: "Contact created",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAll = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const contactQuery = PhoneBook.find();
  let fetchedContacts;
  if (pageSize && currentPage) {
    contactQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  contactQuery
    .find()
    .then((documents) => {
      fetchedContacts = documents;
      return PhoneBook.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "fetched successfully",
        contacts: fetchedContacts,
        maxPosts: count,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//**********************get contact  */
exports.getContact = (req, res) => {
  const id = req.params.id;
  PhoneBook.findById(id).then((contact) => {
    if (!contact) {
      return res.status(500).json({
        message: "contact not found",
      });
    }
    return res.status(200).json(contact);
  });
};

//******************updating contact */
exports.updateContact = (req, res) => {
  let { id } = req.params;
  const { name, email, phoneNumber } = req.body;
  console.log(req.body);

  PhoneBook.findOneAndUpdate(
    { _id: id },
    { name, email, phoneNumber },
    { new: true }
  )
    .then((contact) => {
      return res.status(200).json(contact);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

///*********************delete conatct */
exports.deleteContact = (req, res) => {
  PhoneBook.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.n > 0) {
      res.status(200).json({ message: "delete successful!" });
    } else {
      res.status(500).json({ message: " something went wrong!" });
    }
  });
};
