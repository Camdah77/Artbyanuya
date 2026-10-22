from django.urls import path
from .views import get_artworks, get_exhibitions  # Lägg till get_exhibitions här

urlpatterns = [
    path('data/', get_artworks, name='get_artworks'),
    path('exhibitions/', get_exhibitions, name='get_exhibitions'),  # Ny API-länk för utställningar!
]
