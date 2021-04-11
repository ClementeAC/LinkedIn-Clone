module.exports = {
    // Verification Code *
    createCode: 'INSERT INTO code (verification_code) VALUES ($1) RETURNING *',
    deleteCode: 'DELETE FROM code where verification_code = $1',

    // Querys user *
    getLogin: 'SELECT * FROM app_user WHERE username = $1',
    getUsers: 'SELECT * FROM app_user WHERE user_id != $1',
    createUser: 'INSERT INTO app_user (username, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *',
    updateUser: 'UPDATE app_user SET username = $1, password = $2, img = $3 WHERE user_id = $4 RETURNING *',

    //Profiles
    getProfiles: 'SELECT * FROM profile JOIN app_user ON profile.user_id = app_user.user_id AND profile.user_id = $1',
    createProfile: 'INSERT INTO profile(user_id, description, website, birthday, country, language, name, last_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    updateProfile: 'UPDATE profile SET description = $1, website = $2, birthday = $3, country = $4, name = $5, last_name = $6 WHERE profile_id = $7 RETURNING *',
    deleteProfile: 'DELETE FROM profile where profile_id = $1',
    
    getSkills: 'SELECT * FROM skills WHERE profile = $1',
    getProjects: 'SELECT * FROM projects WHERE profile = $1',
    getInterests: 'SELECT * FROM interests WHERE profile = $1',
    getAchievements: 'SELECT * FROM achievements WHERE profile = $1',
    getWorkExperience: 'SELECT * FROM work_experience WHERE profile = $1',
    getEducation: 'SELECT * FROM education WHERE profile = $1',
    
    createSkills: 'INSERT INTO skills (profile, value) VALUES ($1, $2) RETURNING *',
    createProjects: 'INSERT INTO projects (profile, value, url) VALUES ($1, $2, $3) RETURNING *',
    createInterests: 'INSERT INTO interests (profile, value) VALUES ($1, $2) RETURNING *',
    createAchievements: 'INSERT INTO achievements (profile, title, year, place) VALUES ($1, $2, $3, $4) RETURNING *',
    createWorkExperience: 'INSERT INTO work_experience (profile, title, year, place) VALUES ($1, $2, $3, $4) RETURNING *',
    createEducation: 'INSERT INTO education (profile, title, year, place) VALUES ($1, $2, $3, $4) RETURNING *',

    updateSkills: 'UPDATE skills SET value = $1 WHERE skills_id = $2 RETURNING *',
    updateProjects: 'UPDATE projects SET value = $1, url = $2 WHERE projects_id = $3 RETURNING *',
    updateInterests: 'UPDATE interests SET value = $1 WHERE interests_id = $2 RETURNING *',
    updateAchievements: 'UPDATE achievements SET title = $1, year = $2, place = $3 WHERE achievements_id = $4 RETURNING *',
    updateWorkExperience: 'UPDATE work_experience SET title = $1, year = $2, place = $3 WHERE work_experience_id = $4 RETURNING *',
    updateEducation: 'UPDATE education SET title = $1, year = $2, place = $3 WHERE education_id = $4 RETURNING *',
    
    deleteSkills: 'DELETE FROM skills WHERE skills_id = $1',
    deleteProjects: 'DELETE FROM projects WHERE projects_id = $1',
    deleteInterests: 'DELETE FROM interests WHERE interests_id = $1',
    deleteAchievements: 'DELETE FROM achievements WHERE achievements_id = $1',
    deleteWorkExperience: 'DELETE FROM work_experience WHERE work_experience_id = $1',
    deleteEducation: 'DELETE FROM education WHERE education_id = $1',

    // Publication
    getPublication: 'SELECT * FROM publication WHERE user_id = $1',
    createpublication: 'INSERT INTO publication (user_id, date, descripcion, img, job_offer) VALUES ($1, $2, $3, $4, $5)',
    updatepublication: 'UPDATE publication SET date = 1$, descripcion = 2$, img = 3$ WHERE publication_id = $4 RETURNING *',
    deletepublication: 'DELETE FROM publication WHERE publication_id = $1',

    // Reacciones
    getReaction: 'SELECT * FROM user_reaction WHERE publication = $1',
    createReaction: 'INSERT INTO user_reaction (user_id, date, publication, charmed, interesting, recommend, celebrate) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    updateReaction: 'UPDATE user_reaction SET date = $1, charmed = $2, interesting = $3, recommend = $4, celebrate = $5 WHERE user_reaction_id = $6 RETURNING *',
    deleteRaction: 'DELETE FROM user_reaction WHERE user_reaction_id = $1',

    // Comentarios
    getComment: 'SELECT * FROM user_comment WHERE publication = $1',
    createComment: 'INSERT INTO user_comment (user_id, date, publication, comment) VALUES ($1, $2, $3, $4) RETURNING *',
    updateComment: 'UPDATE user_comment SET date = $1, comment = $2 WHERE user_reaction_id = $3 RETURNING *',
    deleteComment: 'DELETE FROM user_comment WHERE user_reaction_id = $1',

    // Connect
    getconnects: 'SELECT * FROM connect WHERE user_id = 1$',
    createconnect: 'INSERT INTO connect (user_id, connect) VALUES ($1, $2), ($2, $1)',
    deleteconnect: 'DELETE FROM connect WHERE connect_id = $1 OR connect_id = $2 RETURNING *',

    //company
    getCompany: 'SELECT * FROM company WHERE user_id = $1',
    createCompany: 'INSERT INTO company (name, location, user_id) VALUES ($1, $2, $3) RETURNING *',
    updateCompany: 'UPDATE company SET name = $1, location = $2 WHERE company_id = $3 RETURNING *',
    deleteCompany: 'DELETE FROM company WHERE company_id = $1',

    //notification
    getNotifications: 'SELECT * FROM notification WHERE user_id = $1',
    createUserNotification: 'INSERT INTO notification (user_id, date, title, value, connect, type) VALUES ($1, $2, $3, $4, $5, $6)',
    deleteNotification: 'DELETE FROM notification WHERE notification_id = $1',
}