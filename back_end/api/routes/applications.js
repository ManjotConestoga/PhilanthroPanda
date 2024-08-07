const express = require("express");
const router = express.Router();
const db = require("../../repository/db");

router.post("/apply/:id", async (req, res) => {
  const { user_id } = req.body;
  const job_id = req.params.id;
  try {
    const checkUserQuery =
      "SELECT * FROM applications WHERE opportunity_id = $1 and user_id=$2";
    const { rows } = await db.query(checkUserQuery, [job_id, user_id]);
    if (rows.length > 0) {
      return res.status(400).json({
        message: "You have already applied for this job, check the status",
      });
    }
    const insertApplicationQuery =
      "INSERT INTO applications(opportunity_id, user_id, status) VALUES($1, $2, $3)";
    await db.query(insertApplicationQuery, [job_id, user_id, "pending"]);
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("Error inserting into application table:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/trackStatus/:id", async (req, res) => {
  const { user_id } = req.body;
  const jobId = req.params.id;
  try {
    const queryText = `SELECT j.title, o.name company, a.application_date, a.status
                       FROM jobs j
                       JOIN applications a ON j.id = a.opportunity_id
                       join users u on u.user_id=j.user_id
                       join organizations o on o.organization_id=u.organization_id
                       WHERE a.user_id = $1 AND a.opportunity_id = $2 LIMIT 1`;
    const { rows } = await db.query(queryText, [user_id, jobId]);
    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch status info with id", jobId, error);
    res
      .status(500)
      .json({ error: "Failed to fetch status info with id " + jobId });
  }
});

// view applied jobs

router.post("/applied/alljobs", async (req, res) => {
  const { user_id } = req.body;
  try {
    const searchJobQuery = `select a.application_id
                                    ,a.application_date
                                    ,a.status
                                    ,j.id
                                    ,j.title
                                    ,j.location
                                    ,j.description
                                    ,j.skills
                                    ,u.name recruiter_name
                                    ,u.email 
                                    ,u.phone
                                    ,o.name company_name
                          FROM applications a JOIN
                          jobs j
                          ON j.id = a.opportunity_id
                          join users u on u.user_id=j.user_id
                          join organizations o on o.organization_id=u.organization_id
                            where a.user_id=${user_id}
                            order by a.application_date desc`;
    const { rows } = await db.query(searchJobQuery);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "you didn't applied any jobs yet" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/selected/jobs", async (req, res) => {
  const { user_id } = req.body;
  try {
    const searchJobQuery = `select a.application_id
                                    ,a.application_date
                                    ,a.status
                                    ,j.id
                                    ,j.title
                                    ,j.location
                                    ,j.description
                                    ,j.skills
                                    ,u.name recruiter_name
                                    ,u.email 
                                    ,u.phone
                                    ,o.name company_name
                          FROM applications a JOIN
                          jobs j
                          ON j.id = a.opportunity_id
                          join users u on u.user_id=j.user_id
                          join organizations o on o.organization_id=u.organization_id
                            where a.user_id=${user_id} and a.status = 'accepted'
                            order by a.application_date desc`;
    const { rows } = await db.query(searchJobQuery);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "you didn't applied any jobs yet" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// view applied people

router.post("/applied/allApplicants", async (req, res) => {
  const { user_id, opportunity_id } = req.body;
  try {
    const appliedPeopleQuery = `select a.application_id
                                    ,a.application_date
                                    ,a.status
                                    ,j.id
                                    ,j.title
                                    ,j.location
                                    ,u.user_id
                                    ,u.name applicant_name
                                    ,u.email applicant_email
                                    ,u.phone applicant_phone
                          FROM applications a JOIN
                          jobs j
                          ON j.id = a.opportunity_id
                          join users u on u.user_id=a.user_id
                            where j.user_id=${user_id}
                            and j.id=${opportunity_id}
                            order by a.application_date desc`;
    const { rows } = await db.query(appliedPeopleQuery);

    res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// accept an applicant

router.post("/accept/applicant", async (req, res) => {
  const { user_id, opportunity_id, application_id } = req.body;

  try {
    // Begin the transaction
    await db.query("BEGIN");

    // First update statement
    const updateApplicationsQuery = `
      UPDATE applications
      SET status = 'accepted'
      WHERE opportunity_id = $1
        AND application_id = $2;
    `;
    await db.query(updateApplicationsQuery, [
      opportunity_id,
      application_id,
    ]);

    // Second update statement
    const updateJobsQuery = `
      UPDATE jobs
      SET status = 'closed'
      WHERE id = $1;
    `;
    await db.query(updateJobsQuery, [opportunity_id]);

    // Commit the transaction
    await db.query("COMMIT");

    res
      .status(200)
      .send("Application status and job status have been successfully changed");
  } catch (err) {
    // Rollback the transaction in case of an error
    await db.query("ROLLBACK");
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
