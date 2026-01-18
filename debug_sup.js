// Native fetch is available in Node 21+

async function checkUser() {
    try {
        console.log("Fetching user ayushpadhy1309@gmail.com...");
        const response = await fetch('http://localhost:4000/api/users/all');
        const users = await response.json();

        const targetUser = users.find(u => u.email === 'ayushpadhy1309@gmail.com');

        if (targetUser) {
            console.log("User Found:", JSON.stringify(targetUser, null, 2));
            if (targetUser.role !== 'supervisor') console.warn("WARN: Role is NOT supervisor!");
            if (targetUser.status !== 'active') console.warn("WARN: Status is NOT active!");
        } else {
            console.log("User NOT found in database.");
        }

        // Also check raw supervisors endpoint again
        const supRes = await fetch('http://localhost:4000/api/users/supervisors');
        const supervisors = await supRes.json();
        console.log("Supervisors Endpoint returned:", JSON.stringify(supervisors, null, 2));

    } catch (err) {
        console.error("Error:", err);
    }
}

checkUser();
