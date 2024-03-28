import { GraphQLClient, gql } from "graphql-request";
const client = new GraphQLClient("http://localhost:7000/graphql");
export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        date
        title
        company {
          id
          name
        }
      }
    }
  `;
  const { jobs } = await client.request(query);
  return jobs;
}

export async function getJob(id) {
  const query = gql`
    query getJobById($id: ID!) {
      job(id: $id) {
        id
        title
        date
        description
        company {
          id
          name
        }
      }
    }
  `;
  const { job } = await client.request(query, { id });
  return job;
}

export async function getCompany(id) {
  const query = gql`
    query getCompanyById($id: ID!) {
      company(id: $id) {
        name
        description
        jobs {
          id
          date
          title
        }
      }
    }
  `;
  const { company } = await client.request(query, { id });
  return company;
}

export const createJob = async ({ title, description }) => {
  const mututaion = gql`
    mutation createJob($input: CreateJobInput) {
      job: createJob(input: $input) {
        title
        description
        date
        id
        company {
          id
        }
      }
    }
  `;
  const { job } = await client.request(mututaion, {
    input: { title, description },
  });
  return job;
};
