from django.contrib import admin
from .models import Artwork, Exhibition

@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'is_sold', 'created_at')
    list_filter = ('category', 'is_sold')
    search_fields = ('title', 'description')

@admin.register(Exhibition)
class ExhibitionAdmin(admin.ModelAdmin):
    list_display = ('year', 'gallery', 'exhibtype', 'arrangeby')
    list_filter = ('year', 'gallery')
    search_fields = ('year', 'gallery', 'exhibtype')
