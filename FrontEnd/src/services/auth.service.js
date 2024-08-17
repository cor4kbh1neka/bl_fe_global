import { jwtDecode } from "jwt-decode";

export const login = async (data) => {
  try {
    const response = await fetch("/authentications", {
      method: 'POST',
      credentials: "omit",
      headers: {
        'Content-Type': 'application/json',
        'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return { status: true, accessToken: responseData.data.accessToken, refreshToken: responseData.data.refreshToken, apkToken: responseData.data.apkToken };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

export const getUsername = (refreshToken) => {
  const decoded = jwtDecode(refreshToken);
  return decoded.username;
};

export const getTime = (refreshToken) => {
  const decoded = jwtDecode(refreshToken);
  return decoded.iat;
};

export const getExtime = (refreshToken) => {
  const decoded = jwtDecode(refreshToken);
  return decoded.exp;
};

export const banking = async (refreshToken, accesstoken) => {
  try {
    const data = {
      "refreshToken": refreshToken
    };

    const response = await fetch("/authentications/datauser", {
      method: 'POST',
      credentials: "omit",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
        'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return { status: true, databank: responseData.data.databnks };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

export const fetchGroupbank = async (group) => {
  try {
    const response = await fetch(
      `/banks/v2/${group}`,
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const fetchGroupbankwd = async (group) => {
  try {
    const response = await fetch(
      `/banks/v2/${group}`,
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getCoinxx = async (xxusername, accesstoken ) => {

  try {
    const response = await fetch("/prx/checkBalance",
      {
        method: "POST",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI_TWO,
          Authorization: `Bearer ${accesstoken}`,
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify({username: xxusername}),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const deleteToken = async (token) => { 
  try {
    const response = await fetch("/authentications", {
      method: 'DELETE',
      credentials: "omit",
      headers: {
        'Content-Type': 'application/json',
        'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
      },
      body: JSON.stringify({ refreshToken: token }),
    });
    const responseData = await response.json();
    return { status: true, responseData };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

export const putToken = async (refreshtoken, accesstoken) => {
  try {
    const response = await fetch("/authentications", {
      method: 'PUT',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
        'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
      },
      body: JSON.stringify({ refreshToken: refreshtoken }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token expired');
      } else {
        throw new Error('Failed to update token');
      }
    }

    const responseData = await response.json();

    const newActoken = responseData.data.accessToken;
    const newRftoken = responseData.data.refreshTokennew;
    localStorage.setItem('acme', newActoken);
    localStorage.setItem('token', newRftoken);

    return { status: true, responseData };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

export const getReferral = async (xxusername, accesstoken) => {
  try {
    const response = await fetch("/prx/gtdapiref",
      {
        method: "POST",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
          Authorization: `Bearer ${accesstoken}`,
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify({username: xxusername}),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const uptPassword = async (xxusername, accesstoken, xxipaddress, newpassword) => {
  try {
    const response = await fetch("/prx/chngpswd",
      {
        method: "POST",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
          Authorization: `Bearer ${accesstoken}`,
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify(
          {
            username: xxusername,
            password: newpassword,
            ipaddress: xxipaddress
          }
        ),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getHistoryuser = async (xxusername, accesstoken) => {
  try {
    const response = await fetch("/prx/gethstchngpswd",
      {
        method: "POST",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI_TWO,
          Authorization: `Bearer ${accesstoken}`,
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify({username: xxusername}),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};