from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Artwork, Exhibition  # RÄTTAT: Utan 's'
from .serializers import ArtworkSerializer, ExhibitionSerializer

@api_view(['GET'])
def get_artworks(request):
    artworks = Artwork.objects.all()
    serializer = ArtworkSerializer(artworks, many=True)
    return Response(serializer.data)

# TILLAGD: En funktion som skickar utställningsdatan till React på en egen länk
@api_view(['GET'])
def get_exhibitions(request):
    exhibitions = Exhibition.objects.all()
    serializer = ExhibitionSerializer(exhibitions, many=True)
    return Response(serializer.data)
