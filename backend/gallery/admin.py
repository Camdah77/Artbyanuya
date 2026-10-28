from django.contrib import admin
from .models import Artwork, Exhibition

@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    # Detta bestämmer vilka kolumner som syns i listan
    list_display = ('title', 'category', 'style', 'price', 'is_sold', 'created_at')
    # Lägger till ett filtersystem på högerkanten
    list_filter = ('category', 'style', 'is_sold')
    # Gör att du kan söka på titel eller beskrivning
    search_fields = ('title', 'description')

@admin.register(Exhibition)
class ExhibitionAdmin(admin.ModelAdmin):
    list_display = ('year', 'gallery', 'exhibtype', 'arrangeby')
    list_filter = ('year', 'exhibtype')
    search_fields = ('gallery', 'arrangeby')
