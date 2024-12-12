export const getAllNotifications = `
    SELECT 
        Notification.*, 
        UserProfile.user_name,
        UserProfile.user_profile,
        PostJob.position,
        PostJob.image_job,
        PostImage.title AS image_title,
        PostImage.image_post
    FROM 
        Notification 
    LEFT JOIN 
        UserProfile 
    ON 
        Notification.account_id = UserProfile.account_id 
    LEFT JOIN
        PostJob
    ON
        Notification.job_id = PostJob.id
    LEFT JOIN
        PostImage
    ON
        Notification.image_id = PostImage.id
    WHERE 
        Notification.account_id = ?
    AND
        Notification.is_read = 0
    ORDER BY 
        Notification.time DESC
`;
