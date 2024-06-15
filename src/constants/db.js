// const jobs = [
//         {
//             "id": 1,
//             "title":"Build Site Volunteers and Volunteer Crew Leads",
//             "description":"We are in need of volunteers to help complete construction of our future Build projects. When completed, this site will provide affordable homeownership opportunities for our community.Skilled/experienced individuals with a background in construction, renovations and power tool use are very much welcome to apply! We are also qualified and happy to teach any unskilled individuals who have a desire to help and learn on the go!",
//             "company":"HABITAT FOR HUMANITY GUELPH WELLINGTON",
//             "imageurl":"https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/8/12/0/Original_Habitat-for-Humanity_group-shot-workers.jpg.rend.hgtvcom.616.411.suffix/1565625346290.jpeg"
//         },{
//             "id": 2,
//             "title":"ReStore Associate",
//             "description":"The ReStore Associate accepts donations received at the store, from entry into the store to pricing and stocking inventory onto the sales floor, and for providing an excellent customer service experience to both residential and corporate donors.Please fill out our volunteer application, this can be found here: https://habitatgw.ca/volunteer/apply-to-volunteer/",
//             "company":"HABITAT FOR HUMANITY GUELPH WELLINGTON",
//             "imageurl":"https://www.habitathillsborough.org/wp-content/uploads/2018/09/Blog-page-ReStore-hiring.jpg"
//         },{
//             "id": 3,
//             "title":"Kitchen Salvage Service Crew (aka Deconstruction)",
//             "description":"The Kitchen Salvage Service crew (also known as the deconstruction crew) helps remove kitchen components from local homes and businesses, and loads it onto the ReStore truck, so that the kitchen can be donated to the Habitat ReStore. When the ReStore sells these kitchens, the funds support Habitat for Humanity's mission of building affordable homes in our community.Kitchen Salvage Service Crew members are ambassadors of the ReStore and Habitat for Humanity. They will be trained on proper processes, including safety measures. Crew members agree that the donor's home/business and donation is to be treated with care and respect.",
//             "company":"HABITAT FOR HUMANITY GUELPH WELLINGTON",
//             "imageurl":"https://cdn.insteading.com/wp-content/uploads/2016/02/french-country-kitchen-700x385.jpg"
//         },{
//             "id": 4,
//             "title":"Be a STEM Role Model - Guelph",
//             "description":"Volunteering with CAGIS is a rewarding opportunity to inspire the next generation of STEM leaders. By sharing your knowledge and passion, you can spark curiosity and encourage young minds to explore the vast possibilities within science, technology, engineering, and mathematics. Whether leading interactive workshops, organizing field trips, or providing mentorship, your contribution will have a lasting impact on these young enthusiasts’ educational journey and career choices. Together, we can create an inclusive and supportive environment that empowers every participant to reach their full potential.",
//             "company":"CANADIAN ASSOCIATION FOR GIRLS IN SCIENCE",
//             "imageurl":"https://www.womenintech.co.uk/wp-content/uploads/2019/03/cc1af223-3367-4cdb-bc4a-d4cf4a503fcb-768x385.png"
//         }
// ];
// export default jobs;

const { Client } = require("pg");

const PhilanthroPanda = new Client({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "PhilanthroPanda",
  port: 5432,
});

PhilanthroPanda.connect((err) => {
  if (err) throw err;
  console.log("Connected to the PhilanthroPanda database!");
});

// // Example query
// client.query("SELECT * FROM users", (err, res) => {
//   if (err) throw err;
//   console.log(res.rows);
// });

// // Close the connection
// client.end();

module.exports = PhilanthroPanda;
