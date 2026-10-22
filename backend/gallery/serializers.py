from rest_framework import serializers
from .models import Artwork, Exhibition  # RÄTTAT: Tog bort 's' i slutet

class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'

# TILLAGD/RÄTTAT: Skapa en serializer för din utställningsmodell
class ExhibitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibition  # RÄTTAT: Utan 's'
        fields = '__all__'
