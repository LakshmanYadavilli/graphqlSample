import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";

function JobList({ jobs }) {
  console.log({ jobs });
  return (
    <ul className="box">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </ul>
  );
}

function JobItem({ job }) {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;
  return (
    <li className="media">
      <div className="media-left has-text-grey">{formatDate(job.date)}</div>
      <div className="media-content">
        <Link to={{ pathname: `/jobs/${job.id}`, state: job }}>{title}</Link>
      </div>
    </li>
  );
}

export default JobList;
