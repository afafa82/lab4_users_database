const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter full name"],
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: function (value) {
      if (value.length >= 4) {
        return usernameRegex.test(value);
      } else {
        message = "Username must be more than or equals to 4 characters";
      }
    },
  },
  email: {
    type: String,
    required: true,
    //index: true, //Optional if unique is defined
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    uppercase: true,
    //minlength:10,
    //maxlength: 50,
    //Custom validation
    validate: function (value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    },
  },
  address: {
    street: {
      type: String,
      required: [true, `please enter an address`],
    },
    suite: {
      type: String,
      required: [true, `please enter a suite`],
    },
    city: {
      type: String,
      required: [true, `please enter a city`],
      validate(value) {
        const regex = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
        if (!regex.test(value)) {
          throw new Error(`invalid city name`);
        }
      },
    },
    zipcode: {
      type: String,
      required: [true, `please enter a zipcode`],
      validate(value) {
        const regex = /^\d{5}-\d{4}$/;
        if (!regex.test(value)) {
          throw new Error(`enter a valid zip number 55555-5555 `);
        }
      },
      geo: {
        lat: {
          type: String,
          required: true,
        },
        lng: {
          type: String,
          required: true,
        },
      },
    },
  },

  phone: {
    type: Number,
    validate: {
      validator: function (v) {
        return /\d{1}-\d{3}-\d{3}-\d{1}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  website: {
    type: String,
    required: true,
    enum: ["http", "https"],
    trim: true,
    lowercase: true,
  },
  company: {
    name: {
      type: String,
      required: true,
    },
    catchPhrase: {
      type: String,
      required: true,
    },
    bs: {
      type: String,
      required: true,
    },
  },
});

const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;
