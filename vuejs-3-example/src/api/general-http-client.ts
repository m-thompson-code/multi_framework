import axios from "axios";

export type HttpClientResponse<T> = [null, T] | [Error, null];

export interface HttpClient {
  get<T = unknown>(path: string): Promise<HttpClientResponse<T>>;
  post<T = unknown>(path: string, body: unknown): Promise<HttpClientResponse<T>>;
  put<T = unknown>(path: string, body: unknown): Promise<HttpClientResponse<T>>;
  delete<T = unknown>(path: string): Promise<HttpClientResponse<T>>;
}

export class GeneralHttpClient implements HttpClient {
  async get<T = unknown>(path: string): Promise<HttpClientResponse<T>> {
    try {
      const response = await axios.get(path);
      console.log("will return", response);
      return [null, response.data];
    } catch (error: any) {
      this.handleError(error);
      return [error, null];
    }
  }

  async post<T = unknown>(path: string, body: unknown): Promise<HttpClientResponse<T>> {
    try {
      const response = await axios.post(path, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = response.data;
      return [null, data];
    } catch (error: any) {
      this.handleError(error);
      return [error, null];
    }
  }

  async put<T = unknown>(path: string, body: unknown): Promise<HttpClientResponse<T>> {
    try {
      const response = await axios.put(path, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = response.data;
      return [null, data];
    } catch (error: any) {
      this.handleError(error);
      return [error, null];
    }
  }

  async delete<T = unknown>(path: string): Promise<HttpClientResponse<T>> {
    try {
      const response = await axios.delete(path, {
        method: "DELETE"
      });
      const data = response.data;
      return [null, data];
    } catch (error: any) {
      this.handleError(error);
      return [error, null];
    }
  }

  private handleError(error: any) {
    console.log(error);
  }
}
