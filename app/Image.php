<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Category;

class Image extends BaseModel
{
    protected $table = 'images';

    protected $fillable = [
        'slug', 'title', 'description', 'thumb',
        'png_link', 'psd_link', 'ai_link', 'jpg_link',
        'eps_link', 'ppt_link', 'svg_link', 'tag_id', 'meta_description', 'meta_keywords',
        'meta_title', 'category_id', 'album'
    ];

    /**
     * get images information for index
     *
     * @param $category_id
     */
    public static function getIndexImagesByCategory($category_id)
    {
        $categoryChildIds = Category::getAllCategoryChildId($category_id);
        $images = self::whereIn('category_id', $categoryChildIds)
            ->orWhere('category_id', $category_id)->orderBy('id', 'desc')
            ->take(config('constants.limit_images_index'))
            ->get()->toArray();
        $totalImagesOfCategory = self::whereIn('category_id', $categoryChildIds)
            ->orWhere('category_id', $category_id)->count();

        return array($images, $totalImagesOfCategory);
    }

    public static function getAllImagesByCategory($categoryId, $level = 0)
    {
        $categoryChildIds = Category::getAllCategoryChildId($categoryId, $level);
        $images = self::whereIn('category_id', $categoryChildIds)
            ->orWhere('category_id', $categoryId)->orderBy('id', 'desc')
            ->paginate(config('constants.limit_images_category'));

        return $images;
    }

    public static function countByCategory($categoryId, $level = 0)
    {
        $categoryChildIds = Category::getAllCategoryChildId($categoryId, $level);
        $count = self::whereIn('category_id', $categoryChildIds)
            ->orWhere('category_id', $categoryId)
            ->count();
        return $count;
    }
}
