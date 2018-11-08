<?php

namespace App\Models;

use App\Models\Category;
use Carbon\Carbon;

class Image extends BaseModel
{
    const TYPE_PNG = 1;
    const TYPE_PSD = 2;
    const TYPE_AI = 3;
    const TYPE_JPG = 4;
    const TYPE_EPS = 5;
    const TYPE_PPT = 6;
    const TYPE_SVG = 7;

    protected $table = 'images';

    protected $fillable = [
        'slug', 'title', 'description', 'thumb',
        'png_link', 'psd_link', 'ai_link', 'jpg_link',
        'eps_link', 'ppt_link', 'svg_link', 'tag_id', 'meta_description', 'meta_keywords',
        'meta_title', 'category_id', 'album',
    ];

    /**
     * get images information for index
     *
     * @param $category_id
     */
    public static function getIndexImagesByCategory($category_id)
    {
        $categoryChildIds = Category::getAllCategoryChildId($category_id);
        $images           = self::whereIn('category_id', $categoryChildIds)
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
        $images           = self::whereIn('category_id', $categoryChildIds)
            ->orWhere('category_id', $categoryId)->orderBy('id', 'desc')
            ->paginate(config('constants.limit_images_category'));

        return $images;
    }

    public static function countByCategory($categoryId, $level = 0)
    {
        $categoryChildIds = Category::getAllCategoryChildId($categoryId, $level);
        $count            = self::whereIn('category_id', $categoryChildIds)
            ->orWhere('category_id', $categoryId)
            ->count();
        return $count;
    }

    public static function getAllImagesByTag($tagId)
    {
        $images = self::where('tag_id', 'like', '%' . $tagId . '%')
            ->orderBy('id', 'desc')
            ->paginate(config('constants.limit_images_category'));

        return $images;
    }

    public static function countByTag($tagId)
    {
        $count = self::where('tag_id', 'like', '%' . $tagId . '%')->count();
        return $count;
    }

    /**
     * search
     * @param  string $keyword
     * @param  integer $categoryId
     * @return array
     */
    public static function search($params, $select = "*")
    {
        $query = static::selectRaw($select);
        if (isset($params['category']) && $params['category']) {
            $query = $query->whereIn('category_id', array_merge(Category::getAllCategoryChildId($params['category']), [$params['category']]));
        }
        if (isset($params['keyword']) && $params['keyword']) {
            $query = $query->where(function($q) use ($params) {
                $q->findRegex($params['keyword'])
                ->orWhere('title_vn', 'like', '%' . $params['keyword'] . '%');
            });
        }
        return $query->paginate()->appends($params);
    }

    public static function getUpdatedToday()
    {
        return static::whereDate('created_at', Carbon::today())->get()->count();
    }
}
