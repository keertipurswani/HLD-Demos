const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://<username>:<pwd>@<server_uri>/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const departmentSchema = new mongoose.Schema({
    id: String,
    name: String,
    hod: String
});

const Department = mongoose.model('Department', departmentSchema);

const studentSchema = new mongoose.Schema({
    id: String,
    name: String,
    age: Number,
    address: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
});

const Student = mongoose.model('Student', studentSchema);

const schema = buildSchema(`
    type Department {
      id: String
      name: String
      hod: String
    }
  
    type Student {
      id: String
      name: String
      age: Int
      address: String
      department: Department
    }
  
    type Query {
      student(id: String): Student
      students: [Student]
      department(id: String): Department
      departments: [Department]
    }
  
    type Mutation {
      createStudent(id: String, name: String, age: Int, address: String, department: String): Student
      createDepartment(id: String, name: String, hod: String): Department
    }
  `);

const root = {
    student: async ({ id }) => await Student.findById(id).populate('department').exec(),
    students: async () => await Student.find().populate('department').exec(),
    createStudent: async ({ id, name, age, address, department }) => {
        const student = new Student({ id, name, age, address, department });
        return await student.save();
    },
    department: async ({ id }) => await Department.findById(id),
    departments: async () => await Department.find(),
    createDepartment: async ({ id, name, hod }) => {
        const department = new Department({ id, name, hod });
        return await department.save();
    }
};

const app = express();
app.use('/graphql_demo', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
