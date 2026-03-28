import { createClient } from "@supabase/supabase-js";
const anonkey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0a3J2aXFnaWN5am55aGZidWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzI2NjYsImV4cCI6MjA5MDIwODY2Nn0.MKbdeQwZOy7oaLby0hYiN1GjcY7cGudyZzIArE_kv-0";
const supabaseurl = "https://dtkrviqgicyjnyhfbugs.supabase.co";

const supabase = createClient(supabaseurl, anonkey);

export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("no file selected");
    } else {
      const timestamp = new Date().getTime();
      const fileName = timestamp + file.name;
      supabase.storage
        .from("images")
        .upload(fileName, file, {
          upsert: false,
          cacheControl: "3600",
        })
        .then(() => {
          const publicurl = supabase.storage
            .from("images")
            .getPublicUrl(fileName).data.publicUrl;
          console.log("Uploaded image public URL:", publicurl);
          resolve(publicurl);
        })
        .catch(() => {
          reject("An error occurred");
        });
    }
  });
}
