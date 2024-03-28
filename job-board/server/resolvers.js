import { getJobs, getJob, createJob, getJobsByCompany } from "./db/jobs.js";
import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
export const resolvers = {
  Query: {
    greeting: () => "Hello World!",
    jobs: () => getJobs(),
    job: (_root, { id }) => {
      const res = getJob(id);
      console.log({ res });
      if (!res.job)
        throw new GraphQLError(`job not found with ID:${id}`, {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      return res;
    },
    company: (_root, { id }) => {
      const { company } = getCompany(id);
      if (!company)
        throw new GraphQLError(`Company doesn't found with ID: ${id}`, {
          extensions: {
            code: "NOT_FOUND",
          },
        });
    },
  },
  Company: {
    jobs: (company) => {
      console.log({ company });
      return getJobsByCompany(company.id);
    },
  },
  Job: {
    date: (job) => {
      console.log({ job });
      return job.createdAt.slice(0, "yyyy-mm-dd".length);
    },
    company: (company) => getCompany(company.companyId),
  },
  Mutation: {
    createJob: (_root, { input: { title, description } }) => {
      const companyId = "FjcJCHJALA4i";
      return createJob({ companyId, title, description });
    },
  },
};
