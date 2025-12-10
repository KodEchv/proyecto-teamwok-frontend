const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface FetchOptions extends RequestInit {
  body?: any;
}

export class ApiClient {
  private static baseURL = API_BASE_URL;

  private static getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  static async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const fetchOptions: RequestInit = {
      ...options,
      credentials: 'include',  // Incluir cookies y credenciales
      headers: {
        ...this.getAuthHeaders(),
        ...(options.headers || {}),
      },
    };

    if (options.body && typeof options.body === 'object') {
      fetchOptions.body = JSON.stringify(options.body);
    }

    try {
      console.log(`📡 API Call: ${options.method || 'GET'} ${url}`);
      const response = await fetch(url, fetchOptions);

      // Log de respuesta
      console.log(`✅ Response Status: ${response.status}`);

      if (!response.ok) {
        let errorMessage = `HTTP Error: ${response.status}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // Si no hay JSON, usar el status text
          errorMessage = response.statusText || errorMessage;
        }
        
        console.error(`❌ API Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      if (response.status === 204) {
        return null as unknown as T;
      }

      const data: T = await response.json();
      console.log(`✅ Data received:`, data);
      return data;
    } catch (error: any) {
      console.error('❌ API Error Details:', error);
      
      // Detectar errores CORS específicos
      if (error.message && error.message.includes('CORS')) {
        console.error('🚨 CORS Error detected - Check server configuration');
        throw new Error('CORS Error: El servidor no está configurado correctamente. Verifica que CORS esté habilitado en el backend.');
      }
      
      throw error;
    }
  }

  static get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  static post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  static put<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  static delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export default ApiClient;
