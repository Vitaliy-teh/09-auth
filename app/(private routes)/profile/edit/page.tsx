"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { User } from "@/types/user";
import css from "./EditProfilePage.module.css";

const EditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setUserInStore = useAuthStore(state => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
        setUsername(userData.username);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError("Failed to load user data");
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const updatedUser = await updateMe({ username });

      setUserInStore(updatedUser);

      router.push("/profile");
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      setError(error.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.loading}>Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || "/default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={css.input}
              disabled={loading}
            />
          </div>

          <p>Email: {user.email}</p>

          {error && <div className={css.error}>{error}</div>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={loading || !username.trim()}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { getMe, updateMe } from "@/lib/api/clientApi";
// import { User } from "@/types/user";
// import css from "./EditProfilePage.module.css";

// const EditProfile = () => {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await getMe();
//         setUser(userData);
//         setUsername(userData.username);
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;

//     setLoading(true);
//     try {
//       await updateMe({ username });
//       router.push("/profile");
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     router.push("/profile");
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <h1 className={css.formTitle}>Edit Profile</h1>

//         <Image
//           src={user.avatar || "/default-avatar.png"}
//           alt="User Avatar"
//           width={120}
//           height={120}
//           className={css.avatar}
//         />

//         <form onSubmit={handleSubmit} className={css.profileInfo}>
//           <div className={css.usernameWrapper}>
//             <label htmlFor="username">Username:</label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={e => setUsername(e.target.value)}
//               className={css.input}
//             />
//           </div>

//           <p>Email: {user.email}</p>

//           <div className={css.actions}>
//             <button type="submit" className={css.saveButton} disabled={loading}>
//               {loading ? "Saving..." : "Save"}
//             </button>
//             <button
//               type="button"
//               className={css.cancelButton}
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// };

// export default EditProfile;
