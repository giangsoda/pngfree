<?php
    use App\Helpers\General;
?>
@extends('layouts.default')
@section('title', 'category')
@section('css_class_content', 'page-login')
@section('css')
    <link href="css/paginate.css" rel="stylesheet">
@endsection
@section('content_before')
        <!-- v2  Scroll navigation end -->
<h1 style="display:none;">{{ number_format($total) }} Free Graphic Design PNG, Vectors and PSD Files</h1>
<div id="v2-subpageBan" class="subpageBan">
    <div class="w1520 pr">
        <h3 class="title-main">{{ number_format($total) }} Free {{ ucwords(strtolower($category->name)) }}</h3>
        <!-- search -->
        <div class="serach-box">
            <div class="sb-items search-type">
                <a href="javascript:;" class="on" data-type='1'>GRAPHIC
                    DESIGN</a>
                <a href="javascript:;" class="" data-type='2'>BACKGROUNDS</a>
                <a href="javascript:;" data-type='5'>TEMPLATES </a>
                <a href="javascript:;" class="" data-type='6'>POWERPOINT </a>
                <a href="javascript:;" data-type='3'>ICONS</a>
            </div>
            @include('front._partials.search_form')
        </div>
        <p class="bac-p">Download free graphic design PNG images, vectors and PSD files for your design inspiration. </p>
        <p class="bac-p"> PNG, AI, EPS, and PSD format are all available.</p>

    </div>
</div>
@endsection
@section('content')
    <div class="tem-wrapper w1520">
        <!-- mainbav  -->
        <div class="subpage-Mainbav clearfix templates-ban element-cate-click">
            <div class="SM-lists fl-l">
                <a href="{{ $categoriesTags['all_top']->slug }}.html" @if($categoriesTags['all_top']->slug == $category->slug) class="on" @endif>All</a>
                @foreach($categoriesTags['top'] as $val)
                <a href="{{ $val->slug }}.html" @if($val->slug == $category->slug) class="on" @endif>{{ $val->name }}</a>
                @endforeach
            </div>
            <div class="SM-lists fl-l">
                <!--                元素商用-->

                <a href="{{ $categoriesTags['all_top']->slug }}.html" @if($categoriesTags['all_top']->slug == $category->slug) class="on" @endif>All</a>
                @foreach($categoriesTags['mid'] as $val)
                <a href="{{ $val->slug }}.html" @if($val->slug == $category->slug) class="on" @endif>{{ $val->name }}</a>
                @endforeach
            </div>
            <div class="SM-lists fl-l">
            </div>

            <div class="SM-lists fl-l">

                <a href="{{ $category->slug }}.html" @if(!$sort) class="on" @endif>Popular</a>
                <a rel="nofollow" href="{{ $category->slug }}.html?sort=new" @if($sort == 'new') class="on" @endif>New</a>
                <a rel="nofollow" href="{{ $category->slug }}.html?sort=most" @if($sort == 'most') class="on" @endif>Most Download</a>

            </div>

        </div>
        <!-- Excellent Templates -->
        <!--imgList-->
        <div class="main-con gd-photobox">

            <div class="main-body">
                <ul class="mb-box masonry-element clearfix tpl-ul">
                    @foreach ($images as $image)
                        <li class="li-box ">
                            <!-- hover -->
                            <div class="hover-show">
                                <a href="javascript:;" class="element-list-click hs-star star-btn-click "
                                   data-ga="{{ $image->id }}_Like" data-id="{{ $image->id }}" data-type="1">
                                    <i></i>
                                </a>

                                <a target="_blank" rel="nofollow" href="{{ route('home') }}?id=MjY4MzA=&amp;type=1" data-t="0"
                                   data-ga="{{ $image->id }}_PNG" class="element-list-click hs-downPng  down-jpg-click ">
                                    <i></i>PNG</a>

                                <a target="_blank" rel="nofollow" data-ga="{{ $image->id }}_PSD"
                                   href="{{ route('home') }}?id=MjY4MzA=&amp;type=2" data-t="0"
                                   class="element-list-click down-jpg-click hs-downEps down-rar-click ">
                                    <i></i>PSD</a>

                            </div>
                            <!-- png -->

                            <div class="mb-picbox" style="">

                                <img data-original="{{ $image->thumb }}"
                                     alt="{{ $image->title }}" class="lazy" style=""
                                     height="260">
                                <a target="_blank" title="{{ $image->title }}" href="freepng/{{ $image->slug }}"
                                   data-ga="26830_ImgUrl" class="tran element-list-click">

                                </a>
                            </div>
                            <p class="pic-detail text-overflow">{{ $image->title }}</p>
                            <!-- infor -->
                            <div class="pic-infor clearfix">

                                <span class="fl-l">1616*1215</span>

                        <span class="fl-r png-star">
                             <i></i>3856</span>
                        <span class="fl-r png-down">
                            <i></i>42963</span>


                            </div>
                        </li>
                        <div class="gutter-sizer"></div>
                    @endforeach
                </ul>
            </div>

            {{ $images->links('layouts.includes.paginate') }}
        </div>
        <!-- Excellent Templates -->
        <!--imgList-->
    </div>
@endsection

@section('content_after')
@endsection


@section('js')
    <script>
        var csrf = 'X3Q2THRQcW0PA3AYPDsCKzkybB4VHkIVEEYbfRYUOjgWM3UiJjQAVA==',
                vip_type = '0',
                extra_privilege = 0,
                alert_privilege = 0,
                is_old = 0,
                down_count = '0',
                down_sum = '0',
                lang = 'en',
                STYLE = '//js2.pngtree.com/v2',
                no_bot = 1,
                search_ajax = '201',
                source_referer = '200',
                sem_id = '0',
                referral_alert = 201,
                controll_name = 'index',
                head_search_type = '1';
    </script>
    <!--参数传递js脚本模块-->
    <script>
        var getInjectData = function () {
            return {
                'isAlert': 0,
                'isBack': 0,
                'Country': 0,
            }
        }
    </script>
    <script src="v2/js/v2/base-newf3db.js?v=2018081119"></script>
    <script src="v2/js/v2/indexf3db.js?v=2018081119"></script><!--结束js脚本模块-->
    <script>
        addLoadEvent(function () {
            var g_bda = new Date();
            var g_bd_end = g_bda.getTime();
            var g_bdTime = (g_bd_end - g_bd_begin) / 1000;
            $('.load-page-time').html(g_bdTime);
        });
    </script>
    <script type="text/javascript" src="{!!asset('js/guest/login.js')!!}"></script>
@endsection