import tilikanClient from "@/utils/helpers/tilikanClient";

export default async function handler(req, res) {
  const { surveyId } = req.query;
  if (req.method === "GET") {
    try {
      const response = await tilikanClient.get(`/survey-result/date-count/${surveyId}`);
      res.status(200).json(response.data);
    } catch (err) {
      res.status(err.response.data.code).json(err.response.data);
    }
  }
}
