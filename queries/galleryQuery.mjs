export const getAllGallery = `
    SELECT 
        PostImage.*, 
        UserProfile.user_name,
        UserProfile.user_profile,
        COUNT(RatingImage.image_id) AS total_ratings, 
        COALESCE(AVG(RatingImage.rate), 0) AS average_rating  
    FROM 
        PostImage 
    LEFT JOIN 
        RatingImage 
    ON 
        PostImage.id = RatingImage.image_id 
    LEFT JOIN 
        UserProfile 
    ON 
        PostImage.account_id = UserProfile.account_id 
    GROUP BY 
        PostImage.id 
`;

export const getAllGalleryByCategory = `
    SELECT 
        PostImage.*, 
        UserProfile.user_name,
        UserProfile.user_profile,
        COUNT(RatingImage.image_id) AS total_ratings, 
        COALESCE(AVG(RatingImage.rate), 0) AS average_rating  
    FROM 
        PostImage 
    LEFT JOIN 
        RatingImage 
    ON 
        PostImage.id = RatingImage.image_id 
    LEFT JOIN 
        UserProfile 
    ON 
        PostImage.account_id = UserProfile.account_id
    WHERE 
        PostImage.category = ?
    GROUP BY 
        PostImage.id 
`;

export const getAllGalleryByUser = `
    SELECT 
        PostImage.*, 
        UserProfile.user_name,
        UserProfile.user_profile,
        COUNT(RatingImage.image_id) AS total_ratings, 
        COALESCE(AVG(RatingImage.rate), 0) AS average_rating  
    FROM 
        PostImage 
    LEFT JOIN 
        RatingImage 
    ON 
        PostImage.id = RatingImage.image_id 
    LEFT JOIN 
        UserProfile 
    ON 
        PostImage.account_id = UserProfile.account_id
    WHERE 
        PostImage.account_id = ?
    GROUP BY 
        PostImage.id
`;

export const getLatestGallery = `
    SELECT 
        PostImage.*, 
        UserProfile.user_name,
        UserProfile.user_profile,
        COUNT(RatingImage.image_id) AS total_ratings, 
        COALESCE(AVG(RatingImage.rate), 0) AS average_rating 
    FROM 
        PostImage 
    LEFT JOIN 
        RatingImage 
    ON 
        PostImage.id = RatingImage.image_id 
    LEFT JOIN 
        UserProfile 
    ON 
        PostImage.account_id = UserProfile.account_id
    GROUP BY 
        PostImage.id 
    ORDER BY 
        PostImage.time DESC
`;

export const getPopularGallery = `
    SELECT 
        PostImage.*, 
        UserProfile.user_name,
        UserProfile.user_profile,
        COUNT(RatingImage.image_id) AS total_ratings, 
        COALESCE(AVG(RatingImage.rate), 0) AS average_rating 
    FROM 
        PostImage 
    LEFT JOIN 
        RatingImage 
    ON 
        PostImage.id = RatingImage.image_id 
    LEFT JOIN 
        UserProfile 
    ON 
        PostImage.account_id = UserProfile.account_id
    GROUP BY 
        PostImage.id 
    ORDER BY 
        total_ratings DESC
`;

export const getGalleryById = `
    SELECT 
        PostImage.*, 
        UserProfile.user_name,
        UserProfile.user_profile,
        UserProfile.phone_number,
        COUNT(RatingImage.image_id) AS total_ratings, 
        COALESCE(AVG(RatingImage.rate), 0) AS average_rating  
    FROM 
        PostImage 
    LEFT JOIN 
        RatingImage 
    ON 
        PostImage.id = RatingImage.image_id 
    LEFT JOIN 
        UserProfile 
    ON 
        PostImage.account_id = UserProfile.account_id 
    WHERE
        PostImage.id = ?
    GROUP BY 
        PostImage.id
`;

export const getGalleryRating = `
    SELECT 
        RatingImage.*, 
        UserProfile.user_name,
        UserProfile.user_profile 
    FROM 
        RatingImage 
    LEFT JOIN 
        UserProfile 
    ON 
        RatingImage.account_id = UserProfile.account_id 
    WHERE 
        RatingImage.image_id = ?
`;

export const getGalleryCollection = `
    SELECT
        PostImage.*,
        UserProfile.user_name,
        UserProfile.user_profile,
        COUNT(RatingImage.image_id) AS total_ratings,
        COALESCE(AVG(RatingImage.rate), 0) AS average_rating
    FROM
        PostImage
    LEFT JOIN
        RatingImage
    ON
        PostImage.id = RatingImage.image_id
    LEFT JOIN
        UserProfile
    ON
        PostImage.account_id = UserProfile.account_id
    LEFT JOIN
        CollectionImage
    ON
        PostImage.id = CollectionImage.image_id
    WHERE
        CollectionImage.account_id = ?
    GROUP BY
        PostImage.id
`;

export const getRatedGalleryByUser = `
    SELECT
        PostImage.*,
        UserProfile.user_name,
        UserProfile.user_profile,
        RatingImage.rate,
        COUNT(RatingImage.image_id) AS total_ratings,
        COALESCE(AVG(RatingImage.rate), 0) AS average_rating
    FROM
        PostImage
    LEFT JOIN
        RatingImage
    ON
        PostImage.id = RatingImage.image_id
    LEFT JOIN
        UserProfile
    ON
        PostImage.account_id = UserProfile.account_id
    WHERE
        RatingImage.account_id = ?
    GROUP BY
        PostImage.id
`;
