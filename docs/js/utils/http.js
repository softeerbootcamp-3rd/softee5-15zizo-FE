export async function httpGet(url, signal) {
  return await getRes(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "ngrok-skip-browser-warning": "asdf",
    },
    signal: signal,
  });
}

export async function httpPost(url, body, signal) {
  return await getRes(url, {
    method: "POST",
    credentials: "include",
    signal: signal,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "asdf",
    },
    body: JSON.stringify(body),
  });
}

export async function httpDelete(url, signal) {
  return await getRes(url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "ngrok-skip-browser-warning": "asdf",
    },
    signal: signal,
  });
}

export async function httpPatch(url, body, signal) {
  return await getRes(url, {
    method: "PATCH",
    credentials: "include",
    signal: signal,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "asdf",
    },
    body: JSON.stringify(body),
  });
}

async function getRes(url, options) {
  try {
    const res = await fetch(url, options);
    if (res.status >= 403) {
      // 세션 없음
      window.location.href = "./#/register";
      return undefined;
    }

    return res;
  } catch (e) {
    window.location.href = "./#/register";
  }
  return undefined;
}
