import { useParams } from "react-router";
import { companies } from "../lib/fake-data";
import { useEffect, useState } from "react";
import { getCompany } from "../lib/graphql/queries";
import JobList from "../components/JobList";
function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  useEffect(() => {
    getCompany(companyId).then(setCompany);
  }, []);
  console.log({ company });
  if (!company) {
    return <h1>Loading...</h1>;
  }

  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
