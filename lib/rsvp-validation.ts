export function validateRsvp(body: any) {
  const errors: string[] = [];

  if (!body.name?.trim()) {
    errors.push("Name is required");
  }

  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push("Valid email is required");
  }

  if (!body.phone?.trim() || body.phone.replace(/\D/g, "").length < 10) {
    errors.push("Valid phone number is required");
  }

  const guestCount = Number(body.guestCount);
  if (!guestCount || guestCount < 1 || guestCount > 20) {
    errors.push("Guest count must be between 1 and 20");
  }

  if (!["attending", "declining"].includes(body.attendanceStatus)) {
    errors.push("Attendance status is required");
  }

  return errors;
}
