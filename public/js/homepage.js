window.onload = async () => {
  let res = await fetch("/user/api").then((res) => res.json());
  if (res.status === "success") {
    window.location.href = "/dashboard";
  }
};
