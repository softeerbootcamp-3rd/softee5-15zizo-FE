export async function httpGet(url, signal) {
  return await fetch(url, {
    method: "GET",
    credentials: "include",
    signal: signal,
  });
}
