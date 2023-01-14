import express from "express";

// mongoose
// 	.connect("<Add you databse connection HERE>", {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => console.log("Connection to MongoDB success"))
// 	.catch(() => console.log("Connection Failed"));

const app = express();

// app.use((request, response, next) => {
//     response.setHeader('Access-Control-Allow-Origin', '*');
//     response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });

export default app;
