import axios from 'axios';
import { FormSubmitObject, OptionsObject } from '../ts/interfaces';

const baseUrl = 'https://frontend-take-home.fetchrewards.com/form';

const fetchOptions = async (): Promise<OptionsObject | undefined> => {
  try {
    const { data } = await axios.get(baseUrl);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (
  submissionData: FormSubmitObject
): Promise<FormSubmitObject | undefined> => {
  try {
    const { data } = await axios.post(baseUrl, submissionData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { fetchOptions, postData };
